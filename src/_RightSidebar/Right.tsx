import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { AnimatePresence, motion } from "motion/react";
import RightOnline from "./RightOnline";
import { useAtomValue } from "jotai";
import { ONLINE, RIGHT_SIDEBAR_OPEN } from "@/utils/vars";
import RightLocal from "./RightLocal";
import { ONLINE_TRANSITION } from "@/utils/consts";
// import RightOnline from "@/App/RightSideBar/RightOnline";
// import RightLocal from "@/App/RightSideBar/RightLocal";
function RightSidebar() {
	const online = useAtomValue(ONLINE);
	const rightSidebarOpen = useAtomValue(RIGHT_SIDEBAR_OPEN);
	return (
		<Sidebar
			side="right"
			className="bg-sidebar duration-300"
			style={{
				maxWidth: online ? "42%" : "",
				width: online ? "50rem" : "",
				marginRight: online && !rightSidebarOpen ? "calc(21rem - min(42%,50rem))" : "",
				transitionProperty: "all",
				backdropFilter: online ? "blur(8px)" : "",
				backgroundColor: online ? "color-mix(in oklab, var(--sidebar) 75%, transparent)" : "",
			}}
		>
			<SidebarContent className="flex duration-300 flex-row w-full h-full gap-0 p-0 overflow-hidden border border-l-0">
				<AnimatePresence initial={false}>
					<motion.div
						{...ONLINE_TRANSITION(online)}
						key={online ? "online" : "local"}
						className="flex flex-col items-center h-full min-w-full overflow-y-hidden "
					>
						{online ? <RightOnline /> : <RightLocal />}
					</motion.div>
				</AnimatePresence>
			</SidebarContent>
		</Sidebar>
	);
}
export default RightSidebar;
