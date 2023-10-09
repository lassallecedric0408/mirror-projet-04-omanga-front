import bcrypt from 'bcryptjs';

type LoginFormValues = {
  username: string;
  password: string;
};

const loginUser = async ({ username, password }: LoginFormValues) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password: hashedPassword }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();

  return data;
};

type SignUpUserFormValues = {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  email: string;
  password: string;
  city: string;
  zipCode: number;
};

async function signUpUser({
  firstName,
  lastName,
  dateOfBirth,
  email,
  password,
  city,
  zipCode,
}: SignUpUserFormValues): Promise<SignUpUserFormValues> {
  const hashedPassword = await bcrypt.hash(password, 10);

  const response = await fetch('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName,
      lastName,
      dateOfBirth,
      email,
      city,
      zipCode,
      password: hashedPassword,
    }),
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }

  const data = await response.json();

  return data;
}

export { loginUser, signUpUser };
