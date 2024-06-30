import { useState } from "react";
import { useStore } from "@tanstack/react-store";

import { HeadBar } from "./head-bar";
import { ImageItem } from "./image-item";
import { Empty } from "./empty";
import { useAddFiles } from "~/hooks/use-add-files";
import { cn } from "~/lib/utils";
import { Scroll } from "../../workspace/atom";
import { defaultSpaceStore } from "~/stores/space";
import { tasksStore } from "~/stores/task";

export function Workbench() {
  const spaceId = useStore(defaultSpaceStore);
  const tasks = useStore(tasksStore, (state) => {
    return state.get(spaceId || "") || [];
  });

  const { handleDrop } = useAddFiles();
  const [position, setPosition] = useState<Scroll>();

  return (
    <section className="flex flex-col h-full">
      <HeadBar position={position} />
      <div
        className={cn("h-full overflow-auto", { "border-t": position?.top })}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onScroll={(event) => {
          const target = event.target as HTMLDivElement;
          setPosition({
            top: target.scrollTop,
            left: target.scrollLeft,
          });
        }}
      >
        <div className="space-y-2 p-4">
          {tasks.length === 0 ? (
            <Empty />
          ) : (
            tasks.map((item) => (
              <ImageItem key={item.filepath} filepath={item.filepath} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
