const API_ENDPOINT = 'https://notes-api.dicoding.dev/v2';

export const getAllNotes = async () => {
  const response = await fetch(`${API_ENDPOINT}/notes`);

  if (!response.ok) {
    throw new Error(`Failed to fetch notes: ${response.statusText}`);
  }

  const responseJson = await response.json();

  if (responseJson.data && responseJson.data.length > 0) {
    return responseJson.data;
  } else {
    throw new Error('No notes available to display');
  }
};

export const createNote = async (note) => {
  const response = await fetch(`${API_ENDPOINT}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });

  if (!response.ok) {
    throw new Error(`Failed to create a new note: ${response.statusText}`);
  }

  const responseJson = await response.json();

  if (responseJson.status === 'success') {
    return responseJson.data;
  } else {
    throw new Error('Failed to create a new note');
  }
};

export const getAllArchivedNotes = async () => {
  const response = await fetch(`${API_ENDPOINT}/notes/archived`);

  if (!response.ok) {
    throw new Error(`Failed to fetch archived notes: ${response.statusText}`);
  }

  const responseJson = await response.json();

  if (responseJson.status === 'success') {
    return responseJson.data;
  } else {
    throw new Error('Failed to fetch archived notes');
  }
};

export const getNote = async (noteId) => {
  const response = await fetch(`${API_ENDPOINT}/notes/${noteId}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch the note: ${response.statusText}`);
  }

  const responseJson = await response.json();

  if (responseJson.status === 'success') {
    return responseJson.data;
  } else {
    throw new Error('Failed to fetch the note');
  }
};

export const archiveNote = async (noteId) => {
  const response = await fetch(`${API_ENDPOINT}/notes/${noteId}/archive`, {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error(`Failed to archive the note: ${response.statusText}`);
  }

  const responseJson = await response.json();

  if (responseJson.status === 'success') {
    return responseJson.data;
  } else {
    throw new Error('Failed to archive the note');
  }
};

export const unarchiveNote = async (noteId) => {
  const response = await fetch(`${API_ENDPOINT}/notes/${noteId}/unarchive`, {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error(`Failed to unarchive the note: ${response.statusText}`);
  }

  const responseJson = await response.json();

  if (responseJson.status === 'success') {
    return responseJson.data;
  } else {
    throw new Error('Failed to unarchive the note');
  }
};

export const removeNote = async (noteId) => {
  const response = await fetch(`${API_ENDPOINT}/notes/${noteId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Failed to delete the note: ${response.statusText}`);
  }

  const responseJson = await response.json();

  if (responseJson.status === 'success') {
    getAllNotes();
    return responseJson.data;
  } else {
    throw new Error('Failed to delete the note');
  }
};
