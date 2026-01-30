import { Link } from "react-router";

function TreeListing({tree_obj, search}) {
	const route = tree_obj.map_link.slice(-10, -4);

    function toTitleCase(str) {
        return str.replace(
            /\w\S*/g,
            text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
        );
    }

	// TODO: TEMPORARY if-stmt maybe
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
			<Link to={'/trees/'+route} className="listing_link"> 
				<div className="max-w-4/5 grid grid-cols-3 gap-10 font-serif text-start text-md mx-9 justify-center mb-5">
					<p> {toTitleCase(tree_obj.common_name)} </p>
					<p> {tree_obj.taxon} </p>
					<p className="pl-14"> {tree_obj.iucn} </p>
				</div>
			</Link>
		);
	}
}
export default TreeListing;