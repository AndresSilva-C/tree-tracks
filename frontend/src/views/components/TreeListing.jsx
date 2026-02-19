import { Link } from "react-router";
import { useCookies } from 'react-cookie';
import AddButton from "./AddButton";

function TreeListing({tree_obj, search, passNotification, in_list, showButton}) {
	// eslint-disable-next-line no-unused-vars
	const [cookies, setCookie] = useCookies([]);
	const route = tree_obj.map_link.slice(-10, -4);

    function toTitleCase(str) {
        return str.replace(
            /\w\S*/g,
            text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
        );
    }

	if (search) {
		return (
			<Link to={'/trees/'+route} className="listing_link"> 
				<div className="w-full grid grid-cols-3 gap-8 font-serif text-start text-md mx-9 justify-center mb-5">
					<p> {toTitleCase(tree_obj.common_name)} </p>
					<p> {tree_obj.taxon} </p>
					<p className="pl-12"> {tree_obj.iucn} </p>
				</div>
			</Link>
		);
	}
	else {
		return (
			<div>
				{showButton && <AddButton styling={'w-6 h-6 absolute left-64'} passNotification={passNotification} size={'small'}
					tree_name={toTitleCase(tree_obj.common_name)} tree_id={tree_obj.map_link.slice(-10, -4)} in_list={in_list} /> }
				<Link to={'/trees/'+route} className="listing_link"> 
					<div className="max-w-4/5 grid grid-cols-3 gap-10 font-serif text-start text-md mx-9 justify-center mb-5">
						<p> {toTitleCase(tree_obj.common_name)} </p>
						<p> {tree_obj.taxon} </p>
						<p className="pl-14"> {tree_obj.iucn} </p>
					</div>
				</Link>
			</div>
		);
	}
}
export default TreeListing;