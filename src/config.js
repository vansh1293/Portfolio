module.exports = {
  email: 'aroravansh.com@gmail.com',

  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/vansh1293',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/vansh-arora-52a0ab2a7/',
    },
  ],

  navLinks: [
    {
      name: 'About',
      url: '/#about',
    },
    {
      name: 'Skills',
      url: '/#skills',
    },
    {
      name: 'Experience',
      url: '/#jobs',
    },
    {
      name: 'Extracurriculars',
      url: '/#leadership',
    },
    {
      name: 'Work',
      url: '/#projects',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
  ],

  colors: {
    green: '#00e5ff',
    navy: '#0a0a0a',
    darkNavy: '#000000',
  },

  srConfig: (delay = 200, viewFactor = 0.1) => ({
    origin: 'bottom',
    distance: '15px',
    duration: 400,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
