import bcryptjs from 'bcryptjs';

const hashPassword = async (password: string): Promise<string> => {
	const salt = await bcryptjs.genSalt(10);
	return bcryptjs.hash(password, salt);
};

export default hashPassword;
