import { Injectable } from '@angular/core';
import { Note } from '../interfaces/note';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notes: Note[] = [];
  private notesSubject = new BehaviorSubject<Note[]>([]);
  private isEdit = new BehaviorSubject<boolean>(false);

  constructor() { }

  setEditable(value: boolean) {
    this.isEdit.next(value);
  }

  getEditable() {
    return this.isEdit.asObservable();
  }

  getNotesObservable(): Observable<Note[]> {
    return this.notesSubject.asObservable();
  }

  createNote(note: Note): void {
    note.id = new Date().getTime();
    this.notes.push(note);
    this.notesSubject.next(this.notes);
  }

  updateNote(updateNote: Note) : void {
    const index = this.notes.findIndex((note) => note.id === updateNote.id);
    if(index !== -1) {
      this.notes[index] = updateNote;
      this.notesSubject.next(this.notes);
    }
  }

  deleteNote(id: number) : void {
    this.notes = this.notes.filter(note => note.id !== id);
    this.notesSubject.next(this.notes);
  }
}
