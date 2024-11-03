import React from "react";

type TextProps = {
  children: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  color?: "primary" | "secondary" | "success" | "warning" | "error" | string;
  align?: "left" | "center" | "right" | "justify";
  gradient?: string;
  blockquote?: boolean;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;
  span?: boolean;
  p?: boolean;
  i?: boolean;
  b?: boolean;
  u?: boolean;
  s?: boolean;
  bold?: boolean;
  semibold?: boolean;
  extrabold?: boolean;
  regular?: boolean;
  italic?: boolean;
  underline?: boolean;
  dashed?: boolean;
  deleted?: boolean;
  uppercase?: boolean;
  lowercase?: boolean;
  capitalize?: boolean;
  shadow?: boolean;
  tracking?: "tight" | "normal" | "wide";
  lineHeight?: "snug" | "normal" | "relaxed" | "loose";
  opacity?: number;
  className?: string;
};

function Text({
  children,
  size,
  color = "text-black",
  align = "left",
  gradient,
  blockquote = false,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  span,
  p,
  i,
  b,
  u,
  s,
  bold = false,
  semibold = false,
  extrabold = false,
  regular = false,
  italic = false,
  underline = false,
  dashed = false,
  deleted = false,
  uppercase = false,
  lowercase = false,
  capitalize = false,
  shadow = false,
  tracking = "normal",
  lineHeight = "normal",
  opacity = 100,
  className = "",
}: TextProps) {
  let Tag: keyof JSX.IntrinsicElements = "p";
  let defaultSize = "text-base";
  let defaultWeight = "font-normal";

  if (h1) {
    Tag = "h1";
    defaultSize = "text-4xl";
    defaultWeight = "font-semibold";
  } else if (h2) {
    Tag = "h2";
    defaultSize = "text-3xl";
    defaultWeight = "font-semibold";
  } else if (h3) {
    Tag = "h3";
    defaultSize = "text-2xl";
    defaultWeight = "font-semibold";
  } else if (h4) {
    Tag = "h4";
    defaultSize = "text-xl";
    defaultWeight = "font-semibold";
  } else if (h5) {
    Tag = "h5";
    defaultSize = "text-lg";
    defaultWeight = "font-medium";
  } else if (h6) {
    Tag = "h6";
    defaultSize = "text-base";
    defaultWeight = "font-medium";
  } else if (blockquote) {
    Tag = "blockquote";
    defaultSize = "text-lg";
    defaultWeight = "font-light italic";
  } else if (span) {
    Tag = "span";
  } else if (i) {
    Tag = "i";
  } else if (b) {
    Tag = "b";
  } else if (u) {
    Tag = "u";
  } else if (s) {
    Tag = "s";
  } else if (p) {
    Tag = "p";
  }

  const alignMap = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
    justify: "text-justify",
  };

  const weightClass = bold
    ? "font-bold"
    : extrabold
      ? "font-extrabold"
      : semibold
        ? "font-semibold"
        : regular
          ? "font-normal"
          : defaultWeight;

  const trackingMap = {
    tight: "tracking-tight",
    normal: "tracking-normal",
    wide: "tracking-wide",
  };

  const lineHeightMap = {
    snug: "leading-snug",
    normal: "leading-normal",
    relaxed: "leading-relaxed",
    loose: "leading-loose",
  };

  return (
    <Tag
      className={`${size ? `text-${size}` : defaultSize} 
                  ${weightClass}
                  ${italic ? "italic" : ""}
                  ${underline ? "underline" : ""}
                  ${dashed ? "line-through" : ""}
                  ${deleted ? "line-through opacity-50" : ""}
                  ${uppercase ? "uppercase" : ""}
                  ${lowercase ? "lowercase" : ""}
                  ${capitalize ? "capitalize" : ""}
                  ${alignMap[align]}
                  ${shadow ? "shadow-md" : ""}
                  ${trackingMap[tracking]} 
                  ${lineHeightMap[lineHeight]} 
                  ${gradient ? `${gradient} text-transparent bg-clip-text` : color}
                  ${className}`}
      style={{ opacity: opacity / 100 }}
    >
      {children}
    </Tag>
  );
}

export { Text };
