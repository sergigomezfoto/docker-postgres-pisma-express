import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()



const f1 = await prisma.forum.create({
    data: {
        name: "Backend Questions (2)"
    }
})
console.log(`created forum ${f1.name} (${f1.id})`);

const f2 = await prisma.forum.create({
    data: {
        name: "Frontend Questions (2)"
    }
})
console.log(`created forum ${f2.name} (${f2.id})`);

const user = await prisma.user.create({
    data: {
        nick: "sergi",
        admin: true,
        fullName: "Sergi Gomez"

    }
})
console.log(`created user ${user.nick} (${user.id})`);

await prisma.message.createMany({
    data: [{
        text: "this is the first forum message (auto)", userId: user.id, forumId: f1.id
    },
    {
        text: "this is the second forum message (auto)", userId: user.id, forumId: f1.id
    },
]
})