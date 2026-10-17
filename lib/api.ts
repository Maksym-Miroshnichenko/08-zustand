import axios from "axios";
import type { Note, NewNote } from "@/types/note";

export interface SearchResponse {
  notes: Note[];
  totalPages: number;
}

type FetchParams = {
  query: string;
  page: number;
  tag?: string;
};

const instance = axios.create({
  baseURL: "https://notehub-public.goit.study/api/notes",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export async function fetchNotes(params: FetchParams): Promise<SearchResponse> {
  const { query, page, tag } = params;

  const response = await instance.get<SearchResponse>("", {
    params: {
      search: query,
      page,
      perPage: 12,
      sortBy: "created",
      tag,
    },
  });

  return response.data;
}

export async function createNote(note: NewNote): Promise<Note> {
  const response = await instance.post<Note>("", note);
  return response.data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const response = await instance.delete<Note>(`/${noteId}`);
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await instance.get<Note>(`/${id}`);

  return response.data;
}
