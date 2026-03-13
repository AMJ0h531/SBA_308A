const BASE_URL = "https://ai.todoist.net/mcp"

// const BASE_URL = "https://api.todoist.com/api/v1/search/tasks/fileter/completed/by_due_date/completed/by_completion_date";
// const (https:api.todoist.com/api/v1/tasks/filter);

// const BASE_URL = "https://jsonplaceholder.typicode.com/todos";

export async function fetchTasks(page){

const response = await fetch(`${BASE_URL}?_limit=10&_page=${page}`);

return await response.json();

}

// {
// "results": [
// {}
// ],
// "next_cursor": "string"
// }

// {
//   "results": [
//     {
//       "user_id": "string",
//       "id": "string",
//       "project_id": "string",
//       "section_id": "string",
//       "parent_id": "string",
//       "added_by_uid": "string",
//       "assigned_by_uid": "string",
//       "responsible_uid": "string",
//       "labels": [
//         "string"
//       ],
//       "deadline": {
//         "property1": "string",
//         "property2": "string"
//       },
//       "duration": {
//         "property1": 0,
//         "property2": 0
//       },
//       "checked": false,
//       "is_deleted": false,
//       "added_at": "string",
//       "completed_at": "string",
//       "completed_by_uid": "string",
//       "updated_at": "string",
//       "due": {},
//       "priority": 0,
//       "child_order": 0,
//       "content": "string",
//       "description": "string",
//       "note_count": 0,
//       "day_order": 0,
//       "is_collapsed": true
//     }
//   ],
//   "next_cursor": "string"
// }
// {
// "user_id": "string",
// "id": "string",
// "project_id": "string",
// "section_id": "string",
// "parent_id": "string",
// "added_by_uid": "string",
// "assigned_by_uid": "string",
// "responsible_uid": "string",
// "labels": [
// "string"
// ],
// "deadline": {
// "property1": "string",
// "property2": "string"
// },
// "duration": {
// "property1": 0,
// "property2": 0
// },
// "checked": false,
// "is_deleted": false,
// "added_at": "string",
// "completed_at": "string",
// "completed_by_uid": "string",
// "updated_at": "string",
// "due": { },
// "priority": 0,
// "child_order": 0,
// "content": "string",
// "description": "string",
// "note_count": 0,
// "day_order": 0,
// "is_collapsed": true
// }

// {
// "content": "string",
// "description": "string",
// "labels": [
// "string"
// ],
// "priority": 2,
// "due_string": "string",
// "due_date": "string",
// "due_datetime": "string",
// "due_lang": "string",
// "assignee_id": 123456789,
// "duration": 30,
// "duration_unit": "minute",
// "deadline_date": "2025-02-12",
// "child_order": 12,
// "is_collapsed": true,
// "day_order": 3
// }













