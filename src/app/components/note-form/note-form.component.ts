import { Note } from './../../interfaces/note';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent implements OnInit {

  noteForm!:FormGroup
  constructor(private formBuilder: FormBuilder, private noteService: NoteService) {}
  ngOnInit(): void {
    this.noteForm = this.formBuilder.group({
      id: 1,
      title: ['', Validators.required],
      content:[''],
    });
  }

  onSubmit():void {
    if(this.noteForm.invalid){
      return;
    }
    const note: Note = this.noteForm.value;
    this.noteService.createNote(note);

    // this.noteService.getNotesObservable().subscribe((notes: Note[]) => {
    //   console.log(notes);
    // });

    this.noteForm.reset();
  }
}
