import { ProfileEnum } from '../longProcesses/enums';
import { ProfileType } from '../longProcesses/types';

type Props = {
  list: Array<ProfileType>;
};

const Table = ({ list }: Props) => {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>{ProfileEnum.id}</th>
            <th>{ProfileEnum.FullName}</th>
            <th>{ProfileEnum.userId}</th>
            <th>{ProfileEnum.thumbnailUrl}</th>
          </tr>
        </thead>
        <tbody>
          {list.length > 0 &&
            list.map((item, index: number) => {
              return (
                <tr key={item?.id}>
                  <td>{index + 1}</td>
                  <td>{item?.id}</td>
                  <td>{`${item?.firstName} ${item?.lastName}`}</td>
                  <td>{item?.id}</td>
                  <td>
                    <img
                      src={item?.thumbnailUrl}
                      alt={item?.firstName}
                      width={50}
                      height={50}
                      loading="lazy"
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
