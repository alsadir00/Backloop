export type UserEntity = {
  id: string;
  name?: string;
  passwordHash: string;
  email: string;
  createdAt: Date;
  updatedAt?: Date | null;
};


export class User {
    private props: UserEntity;

    constructor(props: UserEntity) {
        this.props = props;
    }

    static create(props: Omit<UserEntity,"createdAt" | "updatedAt"> & { createdAt?: Date }): User {
      const now = props.createdAt ?? new Date();
      const user : UserEntity = {
        ...props,
        createdAt: now,
        updatedAt: null,
      };
      return new User(user);
    }
    
    //  getters
    getId(): string {return this.props.id; }
    getName(): string | undefined {return this.props.name; }
    getPasswordHash(): string {return this.props.passwordHash; }
    getEmail(): string {return this.props.email; }
    getCreatedAt(): Date {return this.props.createdAt; }
    getUpdatedAt(): Date | null | undefined {return this.props.updatedAt; }

    // immutable updaters
    changeName(name: string): User {
      return new User({
        ...this.props,
        name,
        updatedAt: new Date(),
      });
    }

    withPasswordHash(passwordHash: string): User {
      return new User({
        ...this.props,
        passwordHash,
        updatedAt: new Date(),
      });
    }
    toJSON()  {
      const {passwordHash, ...rest} = this.props;
      return {
        ...rest,
      };
    }

}