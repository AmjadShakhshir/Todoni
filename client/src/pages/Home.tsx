import { useEffect } from "react"
import useAppSelector from "../hooks/useAppSelector"
import useAppDispatch from "../hooks/useAppDispatch";
import { fetchTodos } from "../redux/Reducers/todosReducer";

const Home = () => {
    const todos  = useAppSelector(state => state.todosReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch])
    return (
        <div className="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center">
            <div className="list-group">
                { todos.status === 'loading' && <div className="list-group-item">Loading...</div> }

                { todos.status === 'failed' && <div className="list-group-item">Error: {todos.error}</div> }

                { todos.status === 'succeeded' && todos.data.map(todo => (
                    <label className="list-group-item d-flex gap-3">
                        <input className="form-check-input flex-shrink-0" type="checkbox" value="" style={{fontSize: '1.375em'}} />
                        <span className="pt-1 form-checked-content">
                            <strong>{todo.title}</strong>
                            <small className="d-block text-body-secondary">
                                <svg className="bi me-1" width="1em" height="1em"><use xlinkHref="#calendar-event"/></svg>
                                {todo.content}
                            </small>
                        </span>
                    </label>
                ))}
                <label className="list-group-item d-flex gap-3">
                <input className="form-check-input flex-shrink-0" type="checkbox" value="" checked style={{fontSize: '1.375em'}} />

                <span className="pt-1 form-checked-content">
                    <strong>Finish sales report</strong>
                    <small className="d-block text-body-secondary">
                    <svg className="bi me-1" width="1em" height="1em"><use xlinkHref="#calendar-event"/></svg>
                    1:00–2:00pm
                    </small>
                </span>
                </label>
                <label className="list-group-item d-flex gap-3">
                <input className="form-check-input flex-shrink-0" type="checkbox" value="" style={{fontSize: '1.375em'}} />
                <span className="pt-1 form-checked-content">
                    <strong>Weekly All Hands</strong>
                    <small className="d-block text-body-secondary">
                    <svg className="bi me-1" width="1em" height="1em"><use xlinkHref="#calendar-event"/></svg>
                    2:00–2:30pm
                    </small>
                </span>
                </label>
                <label className="list-group-item d-flex gap-3">
                <input className="form-check-input flex-shrink-0" type="checkbox" value="" style={{fontSize: '1.375em'}} />
                <span className="pt-1 form-checked-content">
                    <strong>Out of office</strong>
                    <small className="d-block text-body-secondary">
                    <svg className="bi me-1" width="1em" height="1em"><use xlinkHref="#alarm"/></svg>
                    Tomorrow
                    </small>
                </span>
                </label>
                <label className="list-group-item d-flex gap-3 bg-body-tertiary">
                <input className="form-check-input form-check-input-placeholder bg-body-tertiary flex-shrink-0 pe-none" disabled type="checkbox" value="" style={{fontSize: '1.375em'}} />
                <span className="pt-1 form-checked-content">
                    <small className="d-block text-body-secondary">
                    <svg className="bi me-1" width="1em" height="1em"><use xlinkHref="#list-check"/></svg>
                    Choose list...
                    </small>
                </span>
                </label>
            </div>
            </div>
    )
}

export default Home