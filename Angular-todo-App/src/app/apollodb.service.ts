import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import {MatSnackBar} from '@angular/material/snack-bar';
import { Get_Todos,Create_Todos,Delete_Todos,Update_Todos } from './graphqlschema'


@Injectable({
  providedIn: 'root'
})
export class ApollodbService {
  query:Observable<any>
  constructor(private apollo:Apollo,private _snackBar: MatSnackBar) {
    console.log(`Start ApollodbService`);
   }

   // Get All todo's from the database
   getTodoService(){
    this.query = this.apollo.watchQuery({
      query: Get_Todos
    }).valueChanges.pipe(
      map((results:any)=>{
        return results.data.getTodo
      })
    )
}

// Creates and adds new todo item to the todo list
// Than calls the getTodo method to update list
// and  than displays snackBar
createTodoService(title: string){
  this.apollo.mutate({
    mutation:Create_Todos ,
    refetchQueries: [{query:Get_Todos}],
    variables: {
      title:title
    }
  }).subscribe(()=>{
    setTimeout(() => {
      this.openSnackBar("Successfully added a Todo","Okay");
    }, 2000);
  })
}

// Delete todo with the id storted in datebase
// Than calls the getTodo method to update list
// and  than displays snackBar
deletTodoService(id: string){
  this.apollo.mutate({
    mutation:Delete_Todos ,
    refetchQueries: [{query:Get_Todos}],
    variables: {
      deleteTodoId:id
    }
  }).subscribe(()=>{
    setTimeout(() => {
      this.openSnackBar("Todo deleted","Okay");
    }, 2000);

  })
 }


// update the to do list and the complete status 
// Than calls the getTodo method to update list
// and  than displays snackBar
 updateTodoService(id: string,title: string,completed: boolean){
  this.apollo.mutate({
    mutation:Update_Todos ,
    refetchQueries: [{query:Get_Todos}],
    variables: {
      updatTodoId:id,
      title:title,
      completed:completed,
    }
  }).subscribe(()=>{
    setTimeout(() => {
      this.openSnackBar("Todo Updated","Okay");
    }, 2000);
  })
 }

   // This is the snackBar that displays after the uses has clicked an action
   openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{duration: 3000});
  }


}
