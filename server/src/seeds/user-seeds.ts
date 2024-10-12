import { User } from '../models/user.js';

export const seedUsers = async () => {
  await User.bulkCreate(
    [
      { username: 'JollyGuru', email: 'test1@test.com', password: 'password' },
      {
        username: 'SunnyScribe',
        email: 'test2@test.com',
        password: 'password',
      },
      {
        username: 'RadiantComet',
        email: 'test3@test.com',
        password: 'password',
      },
    ],
    { individualHooks: true }
  );
};
