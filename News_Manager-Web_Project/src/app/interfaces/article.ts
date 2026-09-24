// export interface Article {
//   title: string;
//   subtitle: string;
//   body: string;
//   abstract: string;
//   category: 'National' | 'Technology' | 'Sports' | 'Economy';
//   id: number;
//   show: null | 1;
//   user: string;
//   date: number;
// }

export interface Article {
id: string;
id_user: string;
title: string;
subtitle: string;
body: string;
abstract: string;
category: 'National' | 'Technology' | 'Sports' | 'Economy';
update_date: number
//image_data
//image_media_type
}