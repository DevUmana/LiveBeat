declare namespace Express {
  interface Request {
    // Add user to the request object in Express
    user?: {
      username: string;
      userId: number;
    };
  }
}
