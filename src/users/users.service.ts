import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "Alice Johnson",
            "email": "alice.johnson@example.com",
            "role": "admin"
        },
        {
            "id": 2,
            "name": "Bob Smith",
            "email": "bob.smith@example.com",
            "role": "user"
        },
        {
            "id": 3,
            "name": "Catherine Brown",
            "email": "catherine.brown@example.com",
            "role": "user"
        },
        {
            "id": 4,
            "name": "David Williams",
            "email": "david.williams@example.com",
            "role": "admin"
        },
        {
            "id": 5,
            "name": "Emily Davis",
            "email": "emily.davis@example.com",
            "role": "user"
        }
    ]

    findAll(role?: 'admin' | 'user') {
        if (role) {
            return this.users.filter(user => user.role === role);
        }
        return this.users;
    }

    findOne(id: number) {
        return this.users.find(user => user.id === id);
    }

    create(user: { name: string, email: string, role: 'admin' | 'user' }) {
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...user
        }
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, userUpdate: { name?: string, email?: string, role?: 'admin' | 'user' }) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            return null;
        }
        this.users[userIndex] = {
            ...this.users[userIndex],
            ...userUpdate
        }
        return this.users[userIndex];
    }

    remove(id: number) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            return null;
        }
        const removedUser = this.users[userIndex];
        this.users = this.users.filter(user => user.id !== id);
        return removedUser;
    }

}
