"use client";

import { useEffect } from "react";
import AOS from "aos";

export default function AOSInitializer() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      mirror: true,
    });
  }, []);

  return null;
}

// 'use client'

// import { useEffect, useState } from 'react'
// import AOS from 'aos'

// export default function AOSInitializer() {
//     // استخدام حالة لتتبع ما إذا كنا في وضع العميل
//     const [mounted, setMounted] = useState(false)

//     useEffect(() => {
//         // 1. إيقاف AOS تماماً في الرندر الأولي
//         const disableAnimations = document.createElement('style')
//         disableAnimations.textContent = '[data-aos] { opacity: 1 !important; transform: none !important; }'
//         document.head.appendChild(disableAnimations)

//         // 2. إعداد أن الرندر الآن على جانب العميل
//         setMounted(true)

//         // 3. بعد أن يكتمل التحميل، نزيل التعطيل ونهيئ AOS
//         setTimeout(() => {
//             document.head.removeChild(disableAnimations)

//             AOS.init({
//                 duration: 1000,
//                 once: true,
//                 mirror: false,
//                 disable: false,
//                 offset: 120,
//                 delay: 0
//             })
//         }, 500) // تأخير 500 مللي ثانية لضمان اكتمال الهيدريشن

//         return () => {
//             // التنظيف عند الإزالة
//             if (document.head.contains(disableAnimations)) {
//                 document.head.removeChild(disableAnimations)
//             }
//         }
//     }, [])

//     // عندما يتغير المسار في Next.js، نحدّث AOS
//     useEffect(() => {
//         if (mounted) {
//             const refreshAOS = () => AOS.refresh()
//             window.addEventListener('routeChangeComplete', refreshAOS)
//             return () => window.removeEventListener('routeChangeComplete', refreshAOS)
//         }
//     }, [mounted])

//     return null
// }

// // ------------------------------------------------------------

// // 'use client'

// // import { useEffect } from 'react'
// // import AOS from 'aos'
// // import 'aos/dist/aos.css' // Import AOS CSS

// // export default function AOSInitializer() {
// //     useEffect(() => {
// //         // Only initialize AOS on the client side
// //         if (typeof window !== 'undefined') {
// //             AOS.init({
// //                 duration: 800,
// //                 once: true,
// //                 mirror: true,
// //             })

// //             // Refresh AOS on route changes
// //             AOS.refresh()
// //         }
// //     }, [])

// //     // Component doesn't render anything
// //     return null
// // }
// // //             duration: 800,
// // //             once: true,
// // //             mirror: true,
// // //         })

// // //         // Re-initialize on route changes
// // //         AOS.refresh()
// // //     }, [])

// // //     // Return null until mounted on client
// // //     if (!isMounted) return null
// // //     return null
// // // }
