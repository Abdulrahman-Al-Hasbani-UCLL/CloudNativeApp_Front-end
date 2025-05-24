import { useRouter } from 'next/router';
import ThreadComp from '@/components/threads/threadComp';

const Thread = () => {
    const router = useRouter();
    const { id } = router.query;

    if (!id) return <div>Loading...</div>;

    return <ThreadComp id={id} />;
};

export default Thread;
