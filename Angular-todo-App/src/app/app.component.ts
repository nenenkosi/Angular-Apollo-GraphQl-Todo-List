import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { MatSnackBar} from '@angular/material/snack-bar';
import { Get_Todos,Create_Todos,Delete_Todos,Update_Todos } from './graphqlschema'
import { ApollodbService } from './apollodb.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  query:Observable<any>
  disabledExpansion:boolean = true;
  isTodoEmpty:Array<any>;
  constructor(private db: ApollodbService, private apollo:Apollo,private _snackBar: MatSnackBar){
    console.log('Hello AppComponent');
  }

  // Get All todo's from the database it called when the application starts
  ngOnInit(){    
      this.query = this.apollo.watchQuery({
        query: Get_Todos
      }).valueChanges.pipe(
        map((results:any)=>{
          console.log(results.data.getTodo);
          this.isTodoEmpty = results.data.getTodo
          console.log(this.isTodoEmpty);
          console.log(this.query);
          return results.data.getTodo
        })
      )
  }

// When user clicks checkbox to update if task is done or not
  onChange(id:string, title:string,event:any,) {
if (event.checked == true) {
  this.db.updateTodoService(id,title,event.checked)
  this.db.openSnackBar("Todo marked as done", 'okay')
} else {
  this.db.updateTodoService(id,title,event.checked)
  this.db.openSnackBar("Todo marked as not done", 'Okay')
}


    

}

// Creates and adds new todo item to the todo list
// Calls the createTodoService from the ApollodbService
createTodo(title:string){  
  if (title != "") {
  this.db.createTodoService(title)  
  }else{
    this.db.openSnackBar("Please add a task on the todo you can't add empty todo", 'okay')
  }

}

// Delete todo with the id storted in datebase
// Calls the deletTodoService from the ApollodbService
  deletTodo(id:string){
    this.db.deletTodoService(id)
   }

   // expands the so the user can update the todo 
   editTodo(){
    this.disabledExpansion = false
    setTimeout(() => {
      this.disabledExpansion = true
      }, 1000);

   }


   // update the to do list and the complete status
   // Calls the updateTodoService from the ApollodbService
   updateTodo(id: string,title: string,completed: boolean){
    this.db.updateTodoService(id,title,completed)

   }



}
