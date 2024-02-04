import { Note } from './../../interfaces/note';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss'],
})
export class NoteFormComponent implements OnInit, OnChanges {
  noteForm!: FormGroup;
  @Input() selectedNote!: Note;
  isEdit!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private noteService: NoteService
  ) {
    this.noteService.getEditable().subscribe({
      next: (response) => (this.isEdit = response),
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['selectedNote']?.currentValue){
      const value = changes['selectedNote']?.currentValue;
      this.noteForm.patchValue({
        id: value.id,
        title: value.title,
        content: value.content,
      });
    }
  }

  ngOnInit(): void {
    this.noteForm = this.formBuilder.group({
      id: new Date().getTime(),
      title: ['', Validators.required],
      content: [''],
    });
  }

  onSubmit(): void {
    if (this.noteForm.invalid) {
      return;
    }
    const note: Note = this.noteForm.value;
    if(this.isEdit){
      this.noteService.updateNote(note);
      this.noteService.setEditable(false);
    }else{
      this.noteService.createNote(note);
    }
    this.noteForm.reset();
  }
}
