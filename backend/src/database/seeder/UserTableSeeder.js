import User from "../../models/User.js";

class UserTableSeeder {
    constructor() {
        let userData = [
            {
                "name": "admin",
                "email": "admin@gmail.com",
                "password": "admin",
                "role": "admin",
                "gender": "male",
                "address": "kathmandu",
                "phone": "9843363725",
                "image": ''
            },

            {
                "name": "sita",
                "email": "sita@gmail.com",
                "password": "sita",
                "role": "user",
                "gender": "male",
                "address": "kathmandu",
                "phone": "9860462164",
                "image": ''
            }
        ];
        userData.map((data) => {
            User.find({role: data.role}, (err, docs) => {
                if (err) {
                    console.log(err);
                } else {
                    if (docs.length === 0) {
                        let hObj = new User(data);
                        hObj.save().then((res) => {
                            console.log("UserTableSeeder: " + data.role + " created");
                        });
                    }
                }
            });

        });
    }
}

export default UserTableSeeder;