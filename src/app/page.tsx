import Image from 'next/image'
import styles from './page.module.css'
import Avatar from "@/components/ui/Avatar";

export default function Home() {
    return (
        <main className={styles.main}>
            <Avatar size={"large"} type={"text"} isActive={true} pictureUrl={"https://picsum.photos/200"}
                    userName={"정현"}/>
        </main>
    )
}
