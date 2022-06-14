import { NbMenuItem } from '@nebular/theme';
export const MENU_ITEMSTABLEAU: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'home-outline',
    link: '/pages/gestionpub/gestionactionmarketing/dashboard-principale/',

  },
  {
    title: 'Demande Action Marketing',
    icon: 'flip-2-outline',
    link: '/pages/gestionpub/gestionactionmarketing',
  },
  {
    title: 'Gestion des Contrats',
    icon: 'flip-2-outline',
    link: '/pages/gestionpub/gestionacontrat',
  },






]
export const MENU_ITEMSADMIN: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'home-outline',
    link: '/pages/gestionpub/gestionactionmarketing/dashboard-principale/',

  },
  {
    title: 'Action Marketing',
    expanded: true,
    icon: 'flip-2-outline',

    children: [
      {
        title: 'Demandes Actions Marketings`',
        link: '/pages/gestionpub/gestionactionmarketingadmin',
      },
      {
        title: 'Actions Mobile',
        link: '/pages/gestionpub/gestionactionmarketingadmin/mobile',
      },
      {
        title: 'Actions SMS`',
        link: '/pages/gestionpub/gestionactionmarketingadmin/sms',
      },
      {
        title: 'Actions TV',
        link: '/pages/gestionpub/gestionactionmarketingadmin/tv',
      },

    ],
  },
  {
    title: 'Configuration Générale',
    icon: 'settings-2-outline',
    link: '/pages/gestionpub/gestionactionmarketingadmin/configuration',

  },



]



