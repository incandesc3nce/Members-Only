import { Request, Response, NextFunction } from 'express';

const logoutController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	req.logout((err) => {
		if (err) {
			console.error(err);
			return next(err);
		}
		res.redirect('/');
	});
	res.redirect('/');
};

export { logoutController };
