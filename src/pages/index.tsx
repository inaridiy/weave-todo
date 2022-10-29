"use client";

import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";
import lf from "localforage";
import { isNil, map } from "ramda";
import SDK, { EthWallet } from "weavedb-sdk";
import { Buffer } from "buffer";
import { ethers } from "ethers";
import clsx from "clsx";

const contractTxId = "0g0fBG2qw7jW8xlw4qEohj0e8ODqhwObOxDjjlcNKMY";
const arweave_wallet = {
  kty: "RSA",
  n: "s6p-O9R4xhBLArgxguDjaLFXH5TPQokFt6LQ--L8CNz2vLW0tWchu9bTTTWELtZ1QqdYQu1XlkafexmkdT9qslHVoklAyNMeFBLhOR-AqTaoF4WFQbWTiRitiqE9IhSBLcpVyhfjsT1FkO6h2miW7sdIr1x-NCQyqFMeqwN9ALCSMlVwXLqNNjRnYCghbqN9F0G47h4VNRs9YJBAUwCVaVyatqSUPecBmVu4Mdnn2pT3aetlSwlAFIQdhWd9dklEasml7QSiQ2YvdfRfJ1KTQi5BSWIQZf5aoUSsdzWndAlT-ySYqp02d_J0LX6eSjmE0lOhRfokPii6OzbyInHr5fIHh9_YBzv8Y9EMyT7Jh_nEzZj9lYtBUQ7BDjtFNYfiEgJcMKly6r30fOiAbeFi3fFNIFWeh_PULLwVZG7HEi-aO6-kGlplBMDIDSPO2zVOFx6Rn7tfpcJxGCD1m-KO7IFOtGOCScQXhvA_IhWV6PLxESs20HRLaTKXYIdnPUgJlwilEZRZfkF6jHelNS3L6LFUtgqn9n8OV9JXn8YreQk94NCL2qmYVQZcAQJUBfWqi7zKWVSZV3eyRL8aUvAZu0j1HJGvflSOcX_Q_XOpn4XOmFLT3kjhCe3fqv3elyCOTriHiTKqrAzBqzmWBAbwY-L_JCzSSFIA81ofKqF-mHE",
  e: "AQAB",
  d: "LrKfwNlG0uQlOv25ELV3Jh0B8hlxjW-j5skQ3IdwzrTwBLiN0aCOqg36OdUxGCNxsvNgA3VBELQme458qmTjTJnslxPHHOuSo9EMbRZ9EH4-Tm7L5fpV8IpTgPbLtvHxaX9vsOloqwar8DG2K9iHcmSlxb6apt7Js-p2zChJ80XxmdePLurmDTKts9Z6ahFgUA0rDekPxg_gchrMPUanjw0cwWAhj71dMwkd5QcoNi4F6KfgWhJ7b1mvep8dgwMkH0VuNR7BNhd3OodbvBLAZ7EyEurELF5iHAyHbyyo64YJJ_upGp9mKuL_w1tntQ8iMLC_-Do99VIMpZtwb_eAQoKCrfQhMGeIleWGdA3KY_uQdGdAI-XyjymAdxEdJhyNPlY2VjigUPEPt9jzY012nIHM6RfkIhpMNA1_-q1KnS_hrlia6RqMAdYKr3u2Lofc-mZnYbP0wh6b7m1ik3YwZHOxB1e2GatWwmeP8ERgZgN1gyvoZUnEh0KJG93gaTSP7U8j-2xQCNz3jXmQXgbhZW1t8J2O-VoZf25J2fJbM7-3XQPCWOxyFvVt7HuIWsD1lnhW4E6z_brKad0je5_GMwVh7L5-3F8Z4q65THd0vWctPTVwrzKXhO8J-6zNWqLW57zEQ_S7S4VkorBI7vKSgnXDjkQnf25WQXwpxmGwLAE",
  p: "35oQhruFFn0CHw-My_OC7HF4xLXQ2wGc1Gl7er4iq_be3_ij5Dr2toy7kbMYbp5BzdcDPBelHUmCxcNubW5gpiFWF6ExQXwJJ1pYuDKJpHUrNmGw6xB9ePReFsfqtpKwTBT_RxrltWRxUJ-Mz5NUn7fLBCioYnRQTvwVxlblVBMrF9lyrSQF3eMcnwEC30ruhHcpWhtBjco2cne8PqtrNlOa1L2Rlcr0PMigOt6ad887cUaZn3ZGw7hBFdINWI9foTe4H_8EdCndhXXiRMU0KYDOE65vZZJFoPfgpRVyXQ8V0hpkKgsvupxMWWtP6RJs7l_gACcPwT5z115dUx5NkQ",
  q: "zbK96ThVaPY819ONeuJ_PJHC54JNmWXzWQlTL8wgoUGSXWG1uW2NZE2fH6DBMRf1u9ygYQPs7lAEMwkwY1CKbLllmsH9ms1S-dCw_OI6kjUS7lJ_Vxw9IF4kg4kk-NReiEg9YXRTLGuFdnguJC9zDbUxF0gW54WgON_RL8qnaRRrxjbq6grcb3zzFzk6V-PzuwRaaTMAXuc6xr4CqnCaVDxo3REIcRXqdUf3C38QZcaFvQWOwAsaVvn5csw-NX7Vg8bby9Z8XzOlyvxJbizgC49Hk4ykIXS031ysZdCyTTo7R5J-zPCjHWSFL2d2HYtpQp8GgDPHT6jr-2pJyE-s4Q",
  dp: "h_D-wysWismNlJy7mPN_UYjbR5zSUZP1aR6IN-OI6Mu6TKi523QNsoZ1MuuTmw0ULLTf_pTRibC7lMhwRo-oqtfxo4QYkht65TYEYlg3XojtsK5MBV2NKxBGc8svY7hi_p51ZSFxLorWaZHW5gxIkqIHB4xAczsL6DlSc7c4zZipxmIpWiJgfropGHJg8Kh5woc_2MxhWnbqC0XIaMGG-QxzQYvPCybMvnerEp9rghO3q_KkS1J5S1ymFUITYxgnp7hcdPdyGb2qNA2rduv9_o2UvFp811_KfUa2iSc01GbreUUaSIVsiyOjN2oKt0TAfVxEr1MQPQhfHTz9uB7gQQ",
  dq: "iCLaCbZc4KDHV9gNdNzedMnLgsj8bp_I1I6VXbbtiYwKQH9gdB6LS20L-TS9Z66B1hmIk2yzrG2MufJE8hXl51s0YZ4uJ_voBKoX2OYo-YbixpQW7yIjWn60D9H-hCiZf_y_kvYX7fgjVmrnrs8wiEv4932gmw4XIk0O92BaN_Np-L9z7f3OMoMxp5cag_y73HRfGezFPAoxHkO3I_JuUX3BsT2Kpr1odMJyQEuSIKmo7Zb2CSfQAOxkKZP_QAx3Z0V_RoLnwWI_Qf6C4sYUadIj_wU_w1yoMIP3HVNoDjCR9yZ_gUdpzRQwCVWiGJ-hxJPXC5Y5PQGBXN3VgxsoQQ",
  qi: "R4tNIVW7rnOLYmWjAOlu1dni352WLdn93Nvn5hjFV1nBtaF0nzYgZ6nHe9fscSJo59z-CDEu5ASyBZx2mCao44nvMRdxooCJledOmNETgS5PyBTLyvm11YGKf5DuvpQNJfckr-0B9BCEbm7P95LeTA48CKhqxF6FckZDJoMbnDLu_K-BO7-wWGL4Yg_nnJGd26i47kIwClLtcE3xH60lURqp1k_5tLJxRLCNYUnWcA7jlhfqWZTpZAj1etuj-_mRjECBfd1KvkvuAf8weOI4uuhoeKk991weKQwvpNgikLrCbpLASpSkjvbHxOl_M9XdUj41woRT2Lo-2SRwmEknOQ",
};

type Task = {
  block: { height: number; timestamp: number };
  data: {
    date: number;
    done: boolean;
    task: string;
    user_address: string;
  };
  id: string;
  setter: string;
};

export default function Home() {
  const [db, setDb] = useState<SDK | null>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState("");
  const [input, setInput] = useState("");
  const [user, setUser] = useState<EthWallet | null>(null);
  const [tab, setTab] = useState<"ALL" | "MY">("ALL");

  const getTasks = useCallback(async () => {
    if (!db) return;
    try {
      setLoading("getTasks");
      setTasks(await db.cget("tasks", ["date", "desc"]));
    } catch (e) {
      console.log(e);
    } finally {
      setLoading("");
    }
  }, [db]);

  const getMyTasks = useCallback(async () => {
    if (!db || !user) return;
    try {
      setLoading("getTasks");
      setTasks(
        await db.cget(
          "tasks",
          ["user_address", "=", user.wallet.toLowerCase()],
          ["date", "desc"]
        )
      );
    } catch (e) {
      console.error(e);
    } finally {
      setLoading("");
    }
  }, [db, user]);

  const addTask = async (task: string) => {
    if (!db || !user) return;
    setLoading("addTask");
    try {
      await db.add(
        {
          task,
          date: db.ts(),
          user_address: db.signer(),
          done: false,
        },
        "tasks",
        user
      );
      await getTasks();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading("");
    }
  };

  const deleteTask = async (id: string) => {
    if (!db || !user) return;
    await db.delete("tasks", id, user);
    await getTasks();
  };

  const login = async () => {
    if (!window.ethereum || !db) return;
    setLoading("login");
    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      await provider.send("eth_requestAccounts", []);
      const wallet_address = await provider.getSigner().getAddress();
      let identity: any = await lf.getItem(
        `temp_address:${contractTxId}:${wallet_address}`
      );
      let tx;
      let err;
      if (isNil(identity)) {
        ({ tx, identity, err } = await db.createTempAddress(wallet_address));
      } else {
        await lf.setItem("temp_address:current", wallet_address);
        setUser({
          wallet: wallet_address,
          privateKey: identity.privateKey,
        });
        return;
      }
      if (!isNil(tx) && isNil(tx.err)) {
        identity.tx = tx;
        identity.linked_address = wallet_address;
        await lf.setItem("temp_address:current", wallet_address);
        await lf.setItem(
          `temp_address:${contractTxId}:${wallet_address}`,
          identity
        );
        setUser({
          wallet: wallet_address,
          privateKey: identity.privateKey,
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading("");
    }
  };

  const checkUser = async () => {
    const wallet_address = (await lf.getItem(`temp_address:current`)) as string;
    if (!isNil(wallet_address)) {
      const identity = (await lf.getItem(
        `temp_address:${contractTxId}:${wallet_address}`
      )) as any;
      if (!isNil(identity))
        setUser({
          wallet: wallet_address,
          privateKey: identity.privateKey,
        });
    }
  };

  const submit = () => {
    if (input) {
      console.log(input);
      addTask(input);
      setInput("");
    }
  };

  useEffect(() => {
    if (tab === "ALL") {
      getTasks();
    } else {
      getMyTasks();
    }
  }, [tab, getTasks, getMyTasks]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.Buffer = Buffer;
    checkUser();
    const db = new SDK({
      wallet: arweave_wallet,
      name: "weavedb",
      version: "1",
      contractTxId,
      arweave: {
        host: "arweave.net",
        port: 443,
        protocol: "https",
      },
    });
    setDb(db);
    db.cget("tasks", ["date", "desc"]).then(console.log);
  }, []);

  return (
    <div className="h-screen bg-base-200">
      <div className="mx-auto w-full max-w-xl p-2 gap-2 flex flex-col">
        <div className="flex w-full gap-2">
          <input
            className="input flex-1 input-bordered"
            placeholder="Create New Era"
            disabled={!user}
            onChange={(e) => setInput(e.target.value)}
          />
          {loading ? (
            <button disabled className="btn btn-disabled loading"></button>
          ) : user ? (
            <button className="btn" onClick={submit}>
              Submit
            </button>
          ) : (
            <button className="btn btn-primary" onClick={login}>
              Login
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <button
            className={clsx(
              "btn flex-1",
              tab === "ALL" ? "btn-primary" : "btn-ghost"
            )}
            onClick={() => setTab("ALL")}
          >
            All Tasks
          </button>
          <button
            className={clsx(
              "btn flex-1",
              tab === "MY" ? "btn-secondary" : "btn-ghost"
            )}
            onClick={() => setTab("MY")}
          >
            My Tasks
          </button>
        </div>
        {tasks.map((task) => (
          <div key={task.id} className="card flex-row bg-base-100 p-2 pl-6">
            <div className="flex flex-col flex-1">
              <div className="text-lg font-bold">{task.data.task}</div>
              <div className="flex gap-2">
                <div>{task.data.done.toString()}</div>
                <div>{new Date(task.data.date * 1000).toLocaleString()}</div>
                <div>
                  {task.data.user_address.slice(0, 6) +
                    "..." +
                    task.data.user_address.slice(-4)}{" "}
                </div>
              </div>
            </div>
            {task.data.user_address === user?.wallet.toLowerCase() && (
              <button
                className="btn btn-error btn-square text-xl"
                onClick={() => deleteTask(task.id)}
              >
                🗑️
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
