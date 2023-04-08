import {Routes, Route} from "react-router-dom";

import AddUserComponents from "../pages/users/AddUserComponents";
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

function RouterComponents() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<LoginComponents/>}/>
                <Route path="/register" element={<AddUserComponents/>}/>

                <Route element={<AuthMiddleware/>}>
                    <Route path="/dashboard" element={<DashboardComponents/>}/>
                    <Route path="/update-profile" element={<UpdateUserComponents/>}/>
                    <Route path="/change-password" element={<ChangePasswordComponents/>}/>
                    <Route path="/show-users" element={<ShowUserComponents/>}/>


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
                    <Route path="/update-question/:id" element={<UpdateBook/>}/>


                </Route>

                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </div>
    )

}

export default RouterComponents;