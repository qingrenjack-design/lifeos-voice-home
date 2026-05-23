import { LayoutGrid } from "lucide-react";

export function SceneButton() {
  return (
    <button className="scene-button" type="button">
      <LayoutGrid size={22} strokeWidth={3} />
      <span>选择情景</span>
    </button>
  );
}
