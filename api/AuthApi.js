class AuthApi {
  static async login(credentials) {
    const payload = {
      email: credentials.username,
      password: credentials.password,
    };
    console.log('Sending data to server');

    const request = new Request(
      'http://172.20.10.13:3900/api/v1/user/sign-in',
      {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(payload),
      }
    );

    try {
      const response = await fetch(request);
      console.log(response);

      return await response.json();
    } catch (error) {
      console.log(error);

      return error;
    }
  }
}

export default AuthApi;
