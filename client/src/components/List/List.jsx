import './List.scss';
import Card from '../card/card';

function List({ posts, isChatOpen }) {
    console.log(posts);
    const gridColsClass = isChatOpen ? "grid-cols-2" : "grid-cols-1 lg:grid-cols-3";

    return (
        <div className={`grid ${gridColsClass} gap-4`}>
            {posts.map(item => (
                <Card key={item.id} item={item} showMessageButton={false} />
            ))}
        </div>
    );
}

export default List;
