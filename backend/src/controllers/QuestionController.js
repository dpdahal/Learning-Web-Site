import QuizQuestion from "../models/QuizQuestion.js";
import fs from "fs";
import QuizAnswer from "../models/QuizAnswer.js";

class QuestionController {

    async index(req, res) {
        try {
            return await QuizQuestion.find({}).then((question) => {
                return res.status(200).json({question: question});
            }).catch((err) => {
                return res.json(err);
            });
        } catch (e) {
            return res.json(e);
        }
    }

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


            let answer = req.body.answer.split(",");
            console.log(answer);

            return await QuizQuestion.create({
                ...req.body,
                answer: answer,
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

    async destroy(req, res) {
        let id = req.params.id;
        let findData = await QuizQuestion.findById(id);
        if (findData.image) {
            let image = findData.image ?? "";
            let filePath = process.cwd() + "\\public\\uploads\\question\\" + image;
            if (fs.existsSync(filePath) && image) {
                fs.unlinkSync(filePath);
                await QuizQuestion.findByIdAndDelete(id);
                return res.status(200).json({success: "Question Question deleted successfully"});
            }
            await QuizQuestion.findByIdAndDelete(id);
            return res.status(200).json({success: "Question Question deleted successfully"});
        } else {

            try {
                await QuizQuestion.findByIdAndDelete(id);
                return res.status(200).json({success: "Question Question deleted successfully"});
            } catch (err) {
                return res.json(err);
            }
        }
    }

    async checkPlayingTimeAnswer(req, res) {
        let questionId = req.body.questionId;
        let answer = req.body.answer;
        await QuizQuestion.findById(questionId).then((question) => {
            let options = question.options;
            let isCorrect = false;
            options.forEach((option) => {
                if (option.option === answer && option.isCorrect) {
                    isCorrect = true;
                }
            });
            return res.status(200).json({isCorrect: isCorrect});
        }).catch((err) => {
            return res.json(err);
        });
    }

    async insertAnswer(req, res) {
        await QuizAnswer.create({...req.body}).then((iqs) => {
            return res.status(200).json({success: "Answer created successfully"});
        }).catch((err) => {
            return res.json(err);
        });

    }

    async checkAnswer(req, res) {
        try {
            let loginUserId = req.body.userId;
            let answerData = await QuizAnswer.find({userId: loginUserId})
                .populate("userId")
                .populate("questionId");
            let questions = [];
            let yourAnswer = [];
            let correctAnswer = [];

            answerData.forEach((answer) => {
                let options = answer.questionId.answer;
                questions.push(answer.questionId);
                yourAnswer.push(answer.answer);
                correctAnswer.push(options);
            });

            return res.status(200).json({
                questions: questions,
                yourAnswer: yourAnswer,
                correctAnswer: correctAnswer
            });

        } catch (e) {
            return res.json(e);
        }

    }


}

export default QuestionController;