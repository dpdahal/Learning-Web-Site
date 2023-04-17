import {Routes, Route} from "react-router-dom";

import AddUserComponents from "../pages/auth/AddUserComponents";
import LoginComponents from "../pages/auth/LoginComponents";
import AuthMiddleware from "../../lib/AuthMiddleware";
import UpdateUserComponents from "../admin-panel/pages/users/UpdateUserComponents";
import DashboardComponents from "../admin-panel/pages/DashboardComponents";
import ShowUserComponents from "../admin-panel/pages/users/ShowUserComponents";
import ChangePasswordComponents from "../admin-panel/pages/users/ChangePasswordComponents";
import RoleMiddleware from "../../lib/RoleMiddleware";

import ShowImportantQuestionComponents from "../admin-panel/pages/importantquestion/ShowImportantQuestionComponents";
import UpdateImportantQuestionComponents
    from "../admin-panel/pages/importantquestion/UpdateImportantQuestionComponents";
import AddImportantQuestionComponents from "../admin-panel/pages/importantquestion/AddImportantQuestionComponents";

import PageNotFound from "../pages/errors/PageNotFound";
import UpdateVideo from "../admin-panel/pages/learningvideo/UpdateVideo";
import ShowVideo from "../admin-panel/pages/learningvideo/ShowVideo";
import AddVideo from "../admin-panel/pages/learningvideo/AddVideo";
import AddBook from "../admin-panel/pages/book/AddBook";
import ShowBook from "../admin-panel/pages/book/ShowBook";
import UpdateBook from "../admin-panel/pages/book/UpdateBook";
import AddQuestion from "../admin-panel/pages/quizquestion/AddQuestion";
import ShowQuestions from "../admin-panel/pages/quizquestion/ShowQuestion";
import ShowBookListForUser from "../admin-panel/pages/book/ShowBookListForUser";
import ShowBookDetailsForUser from "../admin-panel/pages/book/ShowBookDetailsForUser";
import ShowVideoListForUser from "../admin-panel/pages/learningvideo/ShowVideoListForUser";
import ShowVideoDetailsForUser from "../admin-panel/pages/learningvideo/ShowVideoDetailsForUser";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import QuizQuestionAnswer from "../admin-panel/pages/quizquestion/QuizQuestionAnswer";
import CheckQuizAnswer from "../admin-panel/pages/quizquestion/CheckQuizAnswer";
import ShowImportantQuestionListForUser from "../admin-panel/pages/importantquestion/ShowImportantQuestionListForUser";
import ShowImportantQuestionListForDetails
    from "../admin-panel/pages/importantquestion/ShowImportantQuestionListForDetails";
import BookBooking from "../admin-panel/pages/booking/BookBooking";
import ShowBookForUserOrder from "../admin-panel/pages/book/ShowBookForUserOrder";
import VideoBooking from "../admin-panel/pages/booking/VideoBooking";
import ShowVideoForUserOrder from "../admin-panel/pages/learningvideo/ShowVideoForUserOrder";
import AddSuggestQuestion from "../admin-panel/pages/quizquestion/AddSuggestQuestion";
import UpdateQuestion from "../admin-panel/pages/quizquestion/UpdateQuestion";
import QuizListType from "../admin-panel/pages/quizquestion/QuizListType";

function RouterComponents() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<LoginComponents/>}/>
                <Route path="/register" element={<AddUserComponents/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/reset-password/:id" element={<ResetPassword/>}/>

                <Route element={<AuthMiddleware/>}>
                    <Route path="/dashboard" element={<DashboardComponents/>}/>
                    <Route path="/update-profile" element={<UpdateUserComponents/>}/>
                    <Route path="/change-password" element={<ChangePasswordComponents/>}/>
                    <Route path="/show-users" element={<ShowUserComponents/>}/>

                    <Route path="/show-book-for-user/" element={<ShowBookListForUser/>}/>
                    <Route path="/show-book-for-user-type/:type" element={<ShowBookDetailsForUser/>}/>
                    <Route path="/book-booking/:id" element={<BookBooking/>}/>
                    <Route path="/show-book-for-user-order" element={<ShowBookForUserOrder/>}/>



                    <Route path="/quiz-play" element={<QuizListType/>}/>
                    <Route path="/quiz-type-play/:id" element={<QuizQuestionAnswer/>}/>
                    <Route path="/check-answer" element={<CheckQuizAnswer/>}/>


                    <Route path="/show-video-for-user/" element={<ShowVideoListForUser/>}/>
                    <Route path="/show-video-for-user-type/:type" element={<ShowVideoDetailsForUser/>}/>
                    <Route path="/video-booking/:id" element={<VideoBooking/>}/>
                    <Route path="/show-video-for-user-order" element={<ShowVideoForUserOrder/>}/>

                    <Route path="/add-suggest-question" element={<AddSuggestQuestion/>}/>
                    <Route path="/show-important-question-for-user" element={<ShowImportantQuestionListForUser/>}/>
                    <Route path="/show-important-question-user-type/:type"
                           element={<ShowImportantQuestionListForDetails/>}/>


                    <Route element={<RoleMiddleware/>}>
                        <Route path="/add-imp-question" element={<AddImportantQuestionComponents/>}/>
                        <Route path="/show-imp-question" element={<ShowImportantQuestionComponents/>}/>
                        <Route path="/update-imp-question/:id" element={<UpdateImportantQuestionComponents/>}/>
                        <Route path="/add-video" element={<AddVideo/>}/>
                        <Route path="/show-video" element={<ShowVideo/>}/>
                        <Route path="/update-video/:id" element={<UpdateVideo/>}/>
                        <Route path="/add-book" element={<AddBook/>}/>
                        <Route path="/show-book" element={<ShowBook/>}/>
                        <Route path="/update-book/:id" element={<UpdateBook/>}/>
                        <Route path="/add-question" element={<AddQuestion/>}/>
                        <Route path="/show-question" element={<ShowQuestions/>}/>
                        <Route path="/update-quiz-question/:id" element={<UpdateQuestion/>}/>
                    </Route>


                </Route>

                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </div>
    )

}

export default RouterComponents;