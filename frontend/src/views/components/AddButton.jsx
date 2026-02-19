import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import './Button.css'

function AddButton({tree_name, tree_id, in_list, passNotification, styling, size}) {
    const url = 'http://localhost:3001/api/v1/routes'
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies([]);
    const [inList, setInList] = useState(in_list);

	const buttonSize = {
		small: "text-center place-items-center grid rounded-md bg-green-600 text-green-300 w-6 h-6 font-mono text-lg font-bold outline-3 outline-green-800 effect",
		large: "text-center place-items-center grid rounded-xl bg-green-600 text-green-300 w-12 h-12 font-mono text-lg font-bold outline-3 outline-green-800 effect",
	}
	
    function addAction() {
        fetch(url + "/add-tree", {
				method: "POST",
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({username: cookies['USER']['username'], tree_id: tree_id})	
			})
			.then(response => {
                setInList(true);
                passNotification(`${tree_name} has been added to your Favorites list.`);
				return response.json();
			});
    }

    function removeAction() {
        fetch(url + "/remove-tree", {
				method: "POST",
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({username: cookies['USER']['username'], tree_id: tree_id})	
			})
		.then(response => {
			setInList(false);
			passNotification(`${tree_name} has been removed from your Favorites list.`);
			return response.json();
		});
    }

	useEffect(() => {
		setInList(in_list);
	}, [in_list]);
	
	return (
        <div className={styling}>
		    {inList &&
            <div className={`${buttonSize[size]}`} onClick={removeAction}>
				<p className=''> - </p>
			</div>}
            {!inList &&
            <div className={`${buttonSize[size]}`} onClick={addAction}>
				<p className=''> + </p>
			</div>}
        </div>
	);
}
export default AddButton;