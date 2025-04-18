import Loading from "@/components/loading";


interface LoadingScreenProps {
    readonly isOpen: boolean;
}

export default function LoadingScreen({ isOpen }: LoadingScreenProps) {

    if (!isOpen) {
        return null;
    }

    return (
        <div className="loading-screen">
            <Loading color='var(--color-primary)' size={60} />
        </div>
    );
}
