import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SidebarContent, SidebarGroup, SidebarGroupLabel } from "@/components/ui/sidebar";
import { modRouteFromURL } from "@/utils/utils";
import {
	INSTALLED_ITEMS,
	LEFT_SIDEBAR_OPEN,
	ONLINE_PATH,
	ONLINE_SELECTED,
	ONLINE_SORT,
	ONLINE_TYPE,
	RIGHT_SLIDEOVER_OPEN,
	TEXT_DATA,
	TYPES,
} from "@/utils/vars";
import { Separator } from "@radix-ui/react-separator";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { AppWindowIcon, EyeIcon, FolderCheckIcon, ShieldQuestion, ShirtIcon, UploadIcon } from "lucide-react";

function LeftOnline() {
	const textData = useAtomValue(TEXT_DATA);
	const leftSidebarOpen = useAtomValue(LEFT_SIDEBAR_OPEN);
	const types = useAtomValue(TYPES);
	const onlineType = useAtomValue(ONLINE_TYPE);
	const [onlinePath, setOnlinePath] = useAtom(ONLINE_PATH);
	const onlineSort = useAtomValue(ONLINE_SORT);
	const installedItems: any[] = useAtomValue(INSTALLED_ITEMS);
	const setSelected = useSetAtom(ONLINE_SELECTED);
	const setRightSlideOverOpen = useSetAtom(RIGHT_SLIDEOVER_OPEN);
	return (
		<>
			<SidebarGroup className="min-h-fit p-0">
				<SidebarGroupLabel>{textData._LeftSideBar._LeftOnline.Type}</SidebarGroupLabel>
				<SidebarContent
					className="flex flex-row items-center justify-between w-full gap-2 px-2 overflow-hidden"
					style={{
						flexDirection: leftSidebarOpen ? "row" : "column",
					}}
				>
					{types.map((category, index) => {
						return (
							<Button
								key={"filter" + category._sName}
								id={"type " + category._sName}
								onClick={() => {
									if (onlinePath.startsWith(category._sName)) {
										setOnlinePath("home&type=" + onlineType);
										return;
									}
									setOnlinePath(`${category._sName}&_sort=${onlineSort}`);
								}}
								className={"w-25 " + (onlinePath.startsWith(category._sName) && " bg-accent text-background")}
								style={{ width: leftSidebarOpen ? "" : "2.5rem" }}
							>
								{
									[
										<ShirtIcon className="w-6 h-6" />,
										<AppWindowIcon className="w-6 h-6" />,
										<ShieldQuestion className="w-6 h-6" />,
									][index % 3]
								}
								{leftSidebarOpen && category._sName}
							</Button>
						);
					})}
				</SidebarContent>
			</SidebarGroup>
			<Separator
				className="w-full ease-linear duration-200 min-h-[1px] my-2.5 bg-border"
				style={{
					opacity: leftSidebarOpen ? "0" : "",
					height: leftSidebarOpen ? "0px" : "",
					marginBlock: leftSidebarOpen ? "4px" : "",
				}}
			/>
			<SidebarGroup
				className="pr-1"
				style={{
					height: `calc(100% - ${leftSidebarOpen ? "5rem" : "10rem"})`,
				}}
			>
				<SidebarGroupLabel className="flex items-center gap-1">
					{textData.generic.Installed}{" "}
					<Label className="text-accent/50 flex text-xs scale-75">
						<UploadIcon className="min-h-2 min-w-2 w-4 h-4" />{" "}
						{installedItems.filter((item) => item.modStatus === 2).length} |{" "}
						<EyeIcon className="min-h-2 min-w-2 w-4 h-4" />
						{installedItems.filter((item) => item.modStatus === 1).length}
					</Label>
				</SidebarGroupLabel>
				<SidebarContent className="min-w-14 flex flex-col items-center w-full max-h-full gap-2 pl-2 pr-1 overflow-hidden overflow-y-auto duration-200">
					{installedItems.length > 0 ? (
						leftSidebarOpen ? (
							<>
								{installedItems.map((item, index) => (
									<div
										key={item.name}
										className={
											"w-full min-h-12 flex-col justify-center height-in overflow-hidden rounded-lg flex duration-200 " +
											" bg-input/50 text-accent hover:bg-input/80"
										}
										onClick={(e) => {
											if (e.target === e.currentTarget) {
												setSelected(modRouteFromURL(item.source));
												setRightSlideOverOpen(true);
											}
										}}
										style={{
											height: leftSidebarOpen ? "" : "2.5rem",
											width: leftSidebarOpen ? "" : "2.5rem",
											padding: leftSidebarOpen ? "" : "0px",
										}}
									>
										{leftSidebarOpen ? (
											<div className="fade-in flex items-center w-full gap-1 pl-2 pointer-events-none">
												{[
													<EyeIcon className="min-h-4 max-h-4 min-w-4 " />,
													<UploadIcon className="min-h-4 max-h-4 min-w-4 " />,
												][item.modStatus - 1] || <FolderCheckIcon className="min-h-4 max-h-4 min-w-4" />}
												<Label className="min-w-69 w-69 pointer-events-none">
													{item.name.split("\\").slice(-1)[0]}
												</Label>
											</div>
										) : (
											<div className="flex items-center justify-center w-full h-full">{index + 1}</div>
										)}
									</div>
								))}
							</>
						) : (
							<>
								<div className="aspect-square min-h-10 flex-col items-center text-xs justify-center height-in overflow-hidden rounded-lg flex duration-200 bg-input/50 text-accent hover:bg-input/80">
									<UploadIcon className="min-h-2 min-w-2 w-4 h-4" />{" "}
									{installedItems.filter((item) => item.modStatus === 2).length}
								</div>
								<div className="aspect-square min-h-10 flex-col items-center text-xs justify-center height-in overflow-hidden rounded-lg flex duration-200 bg-input/50 text-accent hover:bg-input/80">
									<EyeIcon className="min-h-2 min-w-2 w-4 h-4" />
									{installedItems.filter((item) => item.modStatus === 1).length}
								</div>
								<div className="aspect-square min-h-10 flex-col items-center text-xs justify-center height-in overflow-hidden rounded-lg flex duration-200 bg-input/50 text-accent hover:bg-input/80">
									<FolderCheckIcon className="min-h-2 min-w-2 w-4 h-4" />
									{installedItems.filter((item) => item.modStatus === 0).length}
								</div>{" "}
							</>
						)
					) : (
						<div
							key="loner"
							className="text-foreground/50 flex items-center justify-center w-64 h-12 duration-200 ease-linear"
						>
							{leftSidebarOpen ? "---" : "-"}
						</div>
					)}
				</SidebarContent>
			</SidebarGroup>
		</>
	);
}

export default LeftOnline;
