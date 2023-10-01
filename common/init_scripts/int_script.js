const User = require("../../models/user")
User.countDocuments().then(async (usersCount) => {
    if (usersCount === 0) {
        const usersToInsert = [
            {
                nom: "Bougossa",
                prenom: "Marwen",
                email: "marwen@gmail.com",
                password: "$2a$10$MDIRedaQqMwEzx78OdnOR.8ve5/W42.qDXm/GgQYkTsYfeioKmBkG",
                role: 'Administrateur',
                confirmed: true
            }
        ]
        await User.insertMany(usersToInsert);
    }
});


console.log(`=> All collections has been seeded successfully!`);