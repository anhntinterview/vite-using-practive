'use strict';
/**
 * List of API examples.
 * @route GET /api
 */
export const greeting = async (req, res) => {
    return res.status(200).json({ message: 'Hello World' });
};
//# sourceMappingURL=hello.js.map