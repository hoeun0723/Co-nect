package com.projectmatching.app.domain.user.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.projectmatching.app.config.resTemplate.ResponeException;
import com.projectmatching.app.constant.ResponseTemplateStatus;
import com.projectmatching.app.domain.Validatable;
import com.projectmatching.app.domain.user.Role;
import com.projectmatching.app.domain.user.UserRepository;
import com.projectmatching.app.domain.user.entity.User;
import lombok.*;
import org.springframework.beans.BeanUtils;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import static com.projectmatching.app.constant.ServiceConstant.NAME_SIZE_MAX;

@Getter
@Setter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL) //null 이면 생성되지 않음

/**
 * 유저 필수 정보를 담은 dto;
 */
public class UserEssentialDto implements Validatable {

    private String email; //필수정보 업데이트할 유저를 찾기 위한 이메일

    private String name;
    private String slogan;
    private String image;
    private String content;//자기소개
    private List<Integer> skills; //기술 스택 key 값만 받음
    private String hope_session; //원하는2 작업기간
    private String job; //직업




    @Override
    public void validate() {
        if(name.length() > NAME_SIZE_MAX){
            throw new ResponeException(ResponseTemplateStatus.NAME_SIZE_INVALID);
        }

    }
}