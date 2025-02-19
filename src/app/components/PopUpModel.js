// export default function PopUpModel({ children }) {
//   return (
//     <div
//       className='fixed inset-0 bg-black bg-opacity-10
//      flex justify-center items-center
//     '
//     >
//       <div className=''>
//         <div className='bg-white rounded-md'>
//           <div className='p-5'>
//             <div className='flex justify-between'>{children}</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function ({ children }) {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white rounded-lg p-5 shadow-lg'>{children}</div>
    </div>
  );
}
