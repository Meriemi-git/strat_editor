import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtInfos, User, UserDocument } from '@strat-editor/data';
import { Model } from 'mongoose';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import { v4 } from 'uuid';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService
  ) {}

  async findByMail(mail: string): Promise<User> {
    return this.userModel.findOne({ mail: mail }).exec();
  }

  async addUser(user: User): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.findByMail(user.mail).then((existing) => {
        if (existing) {
          reject(new ConflictException('User already exists'));
        } else {
          const createdUser = new this.userModel(user);
          const generatedUID: string = v4();
          createdUser.uid = generatedUID;
          createdUser.save();
          return this.sendConfirmationMail(createdUser);
        }
      });
    });
  }

  async confirmEmailAddress(token: string): Promise<any> {
    const verifyOptions: JwtVerifyOptions = {
      ignoreExpiration: false,
    };
    const payload = this.jwtService.verify(token, verifyOptions);
    const mail = payload['mail'];
    const uid = payload['uid'];
    if (payload) {
      return this.userModel
        .findOne({ mail: mail, uid: uid })
        .exec()
        .then((user) => {
          if (user) {
            if (user.confirmed) {
              return new BadRequestException('Email address already confirmed');
            } else {
              this.userModel
                .updateOne({ uid: uid }, { confirmed: true })
                .exec();
              Promise.resolve();
            }
          } else {
            return new BadRequestException('Error during email confirmation');
          }
        });
    } else {
      return new BadRequestException('Error during decoding token');
    }
  }

  async verifyToken(payload: JwtInfos): Promise<User> {
    return this.userModel
      .findOne({ mail: payload.userMail, _id: payload.userId })
      .exec();
  }

  sendConfirmationMail(user: UserDocument): Promise<any> {
    const signOptions: JwtSignOptions = {
      expiresIn: '30m',
    };
    const payload = { mail: user.mail, uid: user.uid };
    const token = this.jwtService.sign(payload, signOptions);
    const link = environment.confirmationLink + token;
    return this.mailerService
      .sendMail({
        to: user.mail, // list of receivers
        from: 'contact@aboucipu.fr', // sender address
        subject: 'Confirm your email', // Subject line
        text: `Welcome to strat editor ${user.username} ! \n Please click on the following link to confirm your email address and start using Strat Editor.\n This link will expire in 30 minutes.\n ${link}`,
        html: `<b>Welcome to strat editor ${user.username} !</b><br/>Please click on the following link to confirm your email address and start using Strat Editor.<br/>This link will expire in 30 minutes.<br/> <a href="${link}">${link}</a>`, // HTML body content
      })
      .then(() => {
        Promise.resolve(user);
      })
      .catch((error) => {
        Promise.reject(
          new InternalServerErrorException(
            'Error when sending confirmation mail'
          )
        );
        console.log(error);
      });
  }
}
