import { useRef, useState } from 'react';

type FormElement = React.FormEvent<HTMLFormElement>;

interface Itask {
  name: string;
  done: boolean;
}

// con el jsx le estamos diciendo que va a retorar un elementos jsx osea react
export const App = (): JSX.Element => {
  const [newTask, setNewTask] = useState<string>('');
  const [tasks, setTasks] = useState<Itask[]>([]);

  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask('');
    taskInput.current?.focus();
  };

  const addTask = (name: string): void => {
    const newTasks = [...tasks, { name, done: false }];
    setTasks(newTasks);
  };

  const toggleDoneTask = (i: number): void => {
    const newTasks: Itask[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  };

  const removeTask = (i: number): void => {
    const newTasks: Itask[] = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
  };

  return (
    <div>
      <div className="card">
        <h1>Task App</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ingrese un texto..."
            onChange={(e) => setNewTask(e.target.value)}
            value={newTask}
            ref={taskInput}
            autoFocus
          />

          <button>Save</button>
        </form>
      </div>

      {tasks.map((t: Itask, i: number) => {
        return (
          <div
            className="cardContent"
            key={i}>
            <ul>
              <li style={{ textDecoration: t.done ? 'line-through' : '' }}>
                {t.name}
                <button onClick={() => toggleDoneTask(i)}>
                  {t.done ? '✗' : '✓'}
                </button>
              </li>
              <button onClick={() => removeTask(i)}>Eliminar</button>
            </ul>
          </div>
        );
      })}
    </div>
  );
};
