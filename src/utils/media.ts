const sizes = {
  mobile: 768,
  tablet: 1024,
};

const media = {
  mobile: `@media (max-width: ${sizes.mobile}px)`,
  tablet: `@media (max-width: ${sizes.tablet}px)`,
  onlyTablet: `@media (min-width: ${sizes.mobile + 1}px) and (max-width: ${sizes.tablet}px)`,
};

export default media;
