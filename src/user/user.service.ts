import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
    
    private users = [
        {id:1, name:"Md. Monir Hossain"},
        {id:2, name:"Md. Monir Hossain"},
        {id:3, name:"Md. Monir Hossain"}
    ]
    
    getUsers(){
        return this.users;
    }

    getUser(id: number){
        const user =  this.users.find(user => user.id === id);

        if(!user) throw new NotFoundException("User Not Found")

        return user;
    }

    createUser(data:any){
        const newUser = {
            id : this.users[this.users.length - 1]?.id + 1 || 1,
            name: data.name
        }

        this.users.push(newUser);
        return newUser;
    }

    updateUser(id: number, data: any){
        const user = this.getUser(id);
        Object.assign(user, data)
        return user;
    }

    deleteUser(id: number){
        const user = this.getUser(id);
        this.users = this.users.filter(user => user.id !== id);
        return user;
    }   
}
