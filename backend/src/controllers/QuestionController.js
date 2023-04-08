import QuizQuestion from "../models/QuizQuestion.js";

class QuestionController {

    async store(req, res) {
        try {
            let image = "";
            let optionAImage = "";
            let optionBImage = "";
            let optionCImage = "";
            let optionDImage = "";
            if (req.files) {
                if (req.files.image) {
                    image = req.files.image[0].filename;
                }
                if (req.files.optionAImage) {
                    optionAImage = req.files.optionAImage[0].filename;
                }
                if (req.files.optionBImage) {
                    optionBImage = req.files.optionBImage[0].filename;
                }
                if (req.files.optionCImage) {
                    optionCImage = req.files.optionCImage[0].filename;
                }
                if (req.files.optionDImage) {
                    optionDImage = req.files.optionDImage[0].filename;
                }
            }
            return await QuizQuestion.create({
                ...req.body,
                image,
                optionAImage,
                optionBImage,
                optionCImage,
                optionDImage
            }).then((iqs) => {
                return res.status(200).json({success: "Question created successfully"});
            }).catch((err) => {
                return res.json(err);
            });
        } catch (e) {
            return res.json(e);
        }

    }


}

export default QuestionController;