export default function CommonPageComponent({
  title,
  headerComponent,
  bodyComponent,
}) {
  return (
    <div className='h-full flex flex-col'>
      <h1 className='font-semibold py-2'>{title}</h1>
      {/* Table container */}
      <div className='w-full bg-white h-full rounded-[10px] flex flex-col'>
        {headerComponent}
        {/* Table Data */}
        <div className='flex-1 overflow-hidden mb-5'>
          {/* Scrollable Table Body */}
          {bodyComponent}
        </div>
      </div>
    </div>
  );
}
