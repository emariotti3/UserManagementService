import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: UsersService,
          useValue: {
            createUser: jest
              .fn()
              .mockImplementation((user: CreateUserDto) =>
                Promise.resolve(),
              ),
            findOne: jest.fn().mockImplementation((username: string) =>
              Promise.resolve(
                {
                  'id': 1, 
                  'username': 'aziraphale', 
                  'password': '123456'
                }
              ),
            ),
            getUserProfile: jest.fn().mockImplementation((username: string) =>
              Promise.resolve(
                { 
                    'id': 1, 
                    'name': 'Aziraphale', 
                    'address': { 
                      'street': '42 Greek St.', 
                      'city': 'London', 
                      'country': 'England' 
                    } 
                }
              )
            ),
          },
        },
      
      ],
    }).compile();

    usersController = app.get<UsersController>(UsersController);
    usersService = app.get<UsersService>(UsersService);
  });

  it('Users Controller should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('createUser', () => {

    it('Should create a user', () => {

        const testUser = {   
          username:'azfellandco',
          password: 'books123',
          name: 'Aziraphale',
          cityId: 5,
          street: '15 Broadwick St'
        };  

        usersController.createUser(testUser);

        expect(usersService.createUser).toHaveBeenCalledTimes(1);
        expect(usersService.createUser).toHaveBeenCalledWith(testUser);
    });
  });

  describe('getUserProfile', () => {

    it('Should return a user profile', () => {

        var mockRequest = { 'user': {'id': 1, 'username': 'aziraphale' } };

        expect(usersController.getUserProfile(mockRequest)).resolves.toEqual({ 
          'id': 1, 
          'name': 'Aziraphale', 
          'address': { 
            'street': '42 Greek St.', 
            'city': 'London', 
            'country': 'England' 
          } 
        })
        expect(usersService.getUserProfile).toHaveBeenCalledTimes(1);
        expect(usersService.getUserProfile).toHaveBeenCalledWith(mockRequest['user']['username']);
    });
  });

});
