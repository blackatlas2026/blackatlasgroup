'use client'
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export default function PriceRangeSlider({ value, onChange }) {
  return (
    <div className="px-2">
      <Slider
        range
        min={0}
        max={10000}
        value={value}
        onChange={onChange}
        trackStyle={[{ backgroundColor: "#ef4444" }]}
        handleStyle={[
          { borderColor: "#ef4444" },
          { borderColor: "#ef4444" }
        ]}
      />

      <div className="flex justify-between mt-4 text-sm font-medium">
        <span>₹{value[0]}</span>
        <span>₹{value[1]}+</span>
      </div>
    </div>
  );
}
