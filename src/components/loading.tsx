import Image from "next/image";
import loading from "../../public/loading.gif";

export default function Loading({ color = "#fff", size = 20, customClass = "" }) {
    return (
        <div 
            className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 ${customClass}`}
            style={{ pointerEvents: "none" }}
        >
            <div className="w-[120px] h-[120px]">
                <Image src={loading} alt="Imagem de carregamento" />
            </div>
        </div>
    );
}